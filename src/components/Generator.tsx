import { useState } from "react";

export default function TokenCreator() {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [decimals, setDecimals] = useState(6);
  const [supply, setSupply] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-purple-900 text-white p-6 flex">
      <div className="w-1/4 bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-bold">Orion Tools</h2>
        <nav className="mt-6 space-y-2">
          <button className="w-full py-2 bg-blue-500 rounded-lg">Token Creator</button>
          <button className="w-full py-2 bg-gray-700 rounded-lg">Create Liquidity</button>
        </nav>
      </div>
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold">Solana Token Creator</h1>
        <p className="text-gray-300 mt-2">The perfect tool to create Solana SPL tokens.</p>
        <div className="mt-6 bg-gray-800 p-6 rounded-lg w-2/3">
          <label className="block">Name</label>
          <input className="w-full p-2 bg-gray-700 rounded-lg" value={name} onChange={(e) => setName(e.target.value)} />
          <label className="block mt-2">Symbol</label>
          <input className="w-full p-2 bg-gray-700 rounded-lg" value={symbol} onChange={(e) => setSymbol(e.target.value)} />
          <label className="block mt-2">Decimals</label>
          <input className="w-full p-2 bg-gray-700 rounded-lg" type="number" value={decimals} onChange={(e) => setDecimals(Number(e.target.value))} />
          <label className="block mt-2">Supply</label>
          <input className="w-full p-2 bg-gray-700 rounded-lg" value={supply} onChange={(e) => setSupply(e.target.value)} />
          <label className="block mt-2">Description</label>
          <textarea className="w-full p-2 bg-gray-700 rounded-lg" value={description} onChange={(e) => setDescription(e.target.value)} />
          <label className="block mt-2">Image</label>
          <input type="file" className="w-full p-2 bg-gray-700 rounded-lg" onChange={(e) => setImage(e.target.files?.[0] || null)} />
        </div>
      </div>
    </div>
  );
}
