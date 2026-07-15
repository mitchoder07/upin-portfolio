export type CodeSnippet = {
  language: string;
  filename: string;
  code: string;
};

export const projectCodeSnippets: CodeSnippet[] = [
  // Al-Hikmah — Certificate generator with print CSS
  {
    language: "typescript",
    filename: "al-hikmah/CertificatePreview.tsx",
    code: `import { forwardRef } from "react";
import { QRCodeSVG } from "qrcode.react";

/**
 * Al-Hikmah — Print-perfect certificate generator.
 * Uses CSS @media print for page breaks and ATS-friendly layout.
 */
export const CertificatePreview = forwardRef<HTMLDivElement, Props>(
  ({ student, course, score, certificateId }, ref) => {
    return (
      <div ref={ref} className="certificate-sheet">
        <header className="cert-header">
          <Logo />
          <h1>Certificate of Completion</h1>
          <p>This certifies that</p>
        </header>

        <main className="cert-body">
          <h2 className="student-name">{student.name}</h2>
          <p>has successfully completed</p>
          <h3 className="course-title">{course.title}</h3>
          <p>with a final score of <strong>{score}%</strong></p>
        </main>

        <footer className="cert-footer">
          <Signature label="Instructor" name={course.instructor} />
          <QRCodeSVG
            value={\`https://al-hikmah.edu/verify/\${certificateId}\`}
            size={72}
            className="cert-qr"
            aria-label="Verification QR code"
          />
          <Signature label="Date" name={new Date().toLocaleDateString()} />
        </footer>

        <style>{\`
          @media print {
            .certificate-sheet {
              page-break-after: always;
              size: A4 landscape;
              margin: 0;
            }
          }
        \`}</style>
      </div>
    );
  }
);`,
  },

  // Islam Baca — Word-by-word reader hook
  {
    language: "typescript",
    filename: "islam-baca/useWordReader.ts",
    code: `/**
 * Islam Baca — Word-by-word Quran reader.
 * Highlights each word in sequence with adjustable speed.
 * Fully keyboard accessible: Space to play/pause, arrows to step.
 */
export function useWordReader(verse: string[], options: Options = {}) {
  const { speed = 800, loop = false } = options;
  const [activeIdx, setActiveIdx] = useState(-1);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    if (activeIdx >= verse.length - 1) {
      if (!loop) { setPlaying(false); return; }
      setActiveIdx(0);
      return;
    }
    const timer = setTimeout(
      () => setActiveIdx((i) => i + 1),
      speed
    );
    return () => clearTimeout(timer);
  }, [playing, activeIdx, verse.length, speed, loop]);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.code === "Space") {
      e.preventDefault();
      setPlaying((p) => !p);
    } else if (e.code === "ArrowRight") {
      setActiveIdx((i) => Math.min(i + 1, verse.length - 1));
    } else if (e.code === "ArrowLeft") {
      setActiveIdx((i) => Math.max(i - 1, 0));
    }
  };

  return { activeIdx, playing, play: () => setPlaying(true),
           pause: () => setPlaying(false), onKeyDown };
}`,
  },

  // Crypto Vault — AES-256 encryption helper
  {
    language: "typescript",
    filename: "crypto-vault/aes.ts",
    code: `/**
 * Crypto Vault — AES-256-GCM encryption, fully client-side.
 * Zero data leaves the browser. Key derived from user passphrase
 * via PBKDF2 with 600,000 iterations (OWASP 2023 recommendation).
 */
const ENC = "AES-GCM";
const KEY_LEN = 256;
const ITER = 600_000;
const SALT_LEN = 16;
const IV_LEN = 12;

export async function deriveKey(
  passphrase: string,
  salt: Uint8Array
): Promise<CryptoKey> {
  const enc = new TextEncoder();
  const baseKey = await crypto.subtle.importKey(
    "raw", enc.encode(passphrase), "PBKDF2", false, ["deriveKey"]
  );
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations: ITER, hash: "SHA-256" },
    baseKey,
    { name: ENC, length: KEY_LEN },
    false,
    ["encrypt", "decrypt"]
  );
}

export async function encrypt(
  plaintext: string,
  passphrase: string
): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(SALT_LEN));
  const iv = crypto.getRandomValues(new Uint8Array(IV_LEN));
  const key = await deriveKey(passphrase, salt);
  const enc = new TextEncoder();
  const cipher = await crypto.subtle.encrypt(
    { name: ENC, iv }, key, enc.encode(plaintext)
  );
  const blob = new Uint8Array(salt.length + iv.length + cipher.byteLength);
  blob.set(salt, 0);
  blob.set(iv, salt.length);
  blob.set(new Uint8Array(cipher), salt.length + iv.length);
  return toBase64(blob);
}`,
  },

  // Similarity Checker — multi-algorithm scoring
  {
    language: "typescript",
    filename: "similarity-checker/score.ts",
    code: `/**
 * Similarity Checker — Multi-algorithm plagiarism scoring.
 * Combines Cosine, Jaccard, and Levenshtein into a weighted score,
 * then renders the result on a visual gauge.
 */
export function cosineSimilarity(a: string, b: string): number {
  const va = termVector(a);
  const vb = termVector(b);
  let dot = 0, magA = 0, magB = 0;
  for (const term of new Set([...Object.keys(va), ...Object.keys(vb)])) {
    dot += (va[term] || 0) * (vb[term] || 0);
    magA += (va[term] || 0) ** 2;
    magB += (vb[term] || 0) ** 2;
  }
  return magA && magB ? dot / (Math.sqrt(magA) * Math.sqrt(magB)) : 0;
}

export function jaccardIndex(a: string, b: string): number {
  const sa = new Set(a.toLowerCase().split(/\\s+/));
  const sb = new Set(b.toLowerCase().split(/\\s+/));
  const intersection = [...sa].filter((x) => sb.has(x)).length;
  const union = new Set([...sa, ...sb]).size;
  return union ? intersection / union : 0;
}

export function combinedScore(a: string, b: string): number {
  const cosine = cosineSimilarity(a, b);
  const jaccard = jaccardIndex(a, b);
  const levenshtein = 1 - editDistance(a, b) / Math.max(a.length, b.length);
  // Weighted blend favors semantic overlap
  return cosine * 0.5 + jaccard * 0.3 + levenshtein * 0.2;
}`,
  },

  // Cyber Bot — Suggested prompts pattern
  {
    language: "typescript",
    filename: "cyber-bot/suggested-prompts.ts",
    code: `/**
 * Cyber Bot — Suggested-prompts UX pattern.
 * Reduces cold-start friction by surfacing common cybersecurity
 * questions as one-tap chips, then fades them once the user
 * starts typing.
 */
const SUGGESTED_PROMPTS = [
  "What is phishing and how do I spot it?",
  "How does HTTPS actually protect me?",
  "What makes a password strong?",
  "What is two-factor authentication?",
  "How do I know if my email was breached?",
] as const;

export function SuggestedPrompts({
  onPick,
  visible,
}: {
  onPick: (prompt: string) => void;
  visible: boolean;
}) {
  return (
    <div
      className={\`flex flex-wrap gap-2 transition-opacity duration-300 \${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }\`}
      aria-hidden={!visible}
    >
      {SUGGESTED_PROMPTS.map((prompt) => (
        <button
          key={prompt}
          onClick={() => onPick(prompt)}
          className="rounded-full glass px-3 py-1.5 text-xs
                     transition-colors hover:bg-[var(--neon)]/10
                     hover:text-[var(--neon)]"
        >
          {prompt}
        </button>
      ))}
    </div>
  );
}`,
  },

  // Cyber-Words Guess — Game loop
  {
    language: "typescript",
    filename: "cyber-words/useGameLoop.ts",
    code: `/**
 * Cyber-Words Guess — Game loop with color-coded feedback.
 * Green = correct letter in place, Amber = correct letter wrong
 * place, Gray = letter not in word. Classic pattern, accessible
 * labels for screen readers via aria-live.
 */
export type LetterState = "correct" | "present" | "absent";

export function useGameLoop(answer: string, maxGuesses = 6) {
  const [guesses, setGuesses] = useState<string[]>([]);
  const [current, setCurrent] = useState("");
  const [status, setStatus] = useState<"playing" | "won" | "lost">("playing");

  const evaluate = (guess: string): LetterState[] => {
    const result: LetterState[] = new Array(guess.length).fill("absent");
    const answerChars = answer.split("");
    guess.split("").forEach((ch, i) => {
      if (ch === answerChars[i]) {
        result[i] = "correct";
        answerChars[i] = "#";
      }
    });
    guess.split("").forEach((ch, i) => {
      if (result[i] !== "correct" && answerChars.includes(ch)) {
        result[i] = "present";
        answerChars[answerChars.indexOf(ch)] = "#";
      }
    });
    return result;
  };

  const submit = () => {
    if (current.length !== answer.length || status !== "playing") return;
    const next = [...guesses, current];
    setGuesses(next);
    setCurrent("");
    if (current === answer) setStatus("won");
    else if (next.length >= maxGuesses) setStatus("lost");
  };

  return { guesses, current, status, evaluate, submit,
           setCurrent, reset: () => { setGuesses([]); setCurrent(""); setStatus("playing"); } };
}`,
  },

  // Placeholder — portfolio template snippet
  {
    language: "typescript",
    filename: "your-next-design/example.ts",
    code: `// This is a placeholder. Replace with YOUR real code snippet.
// Open /src/lib/project-snippets.ts and swap this out.

export function yourAwesomeComponent(props: Props): JSX.Element {
  // Show recruiters what you actually build.
  // Real code > marketing copy.
  return (
    <section aria-label={props.label}>
      {props.items.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </section>
  );
}

// Tip: Pick a snippet that:
// 1. Shows your strongest design or engineering decision
// 2. Has clean structure and naming
// 3. Demonstrates a real craft trade-off`,
  },
];
