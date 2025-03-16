import { motion } from "framer-motion";

interface TokenCreationSuccessProps {
  isOpen: boolean;
  onClose: () => void;
  mint: string;
  txId: string;
}

export default function TokenCreationSuccess({
  isOpen,
  onClose,
  mint,
  txId,
}: TokenCreationSuccessProps) {
  if (!isOpen) return null;

  const explorerUrl = `https://sonicscan.org/tx/${txId}?cluster=devnet`;
  const tokenUrl = `https://sonicscan.org/address/${mint}?cluster=devnet`;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gray-900 border border-purple-500/20 rounded-xl p-6 max-w-md w-full mx-4"
      >
        <h2 className="text-2xl font-light text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
          Token Created Successfully! 🎉
        </h2>

        <div className="space-y-4">
          <div className="bg-gray-800/50 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-2">Token Address:</p>
            <a
              href={tokenUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 break-all transition-colors"
            >
              {mint}
            </a>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-2">Transaction ID:</p>
            <a
              href={explorerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 break-all transition-colors"
            >
              {txId}
            </a>
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <a
              href={tokenUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg transition-colors"
            >
              View Token
            </a>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
