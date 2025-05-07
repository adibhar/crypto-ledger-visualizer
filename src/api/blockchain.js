const API_BASE = import.meta.env.VITE_API_URL;


export async function getBlockchain() {
    const res = await fetch(`${API_BASE}/blockchain`);
    if (!res.ok) {
        throw new Error("Failed to get blockchain");
    }
    return res.json();
}

export async function sendTransaction(sender, receiver, amount, signature) {
    const payload = {
        sender,
        receiver,
        amount: parseFloat(amount),
        signature,
    };

    console.log("Sending transaction payload:", payload);

    const res = await fetch(`${API_BASE}/transact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        const errorText = await res.json();
        console.error("Backend response:", errorText);
        throw new Error(errorText.error || 'Failed to send transaction');
    }

    return res.json();
}


export async function mineBlock() {
    const res = await fetch(`${API_BASE}/mine`, {
        method: 'GET'
    });

    if (!res.ok) {
        throw new Error("Failed to mine block");
    }

    return res.json();
}

export async function getBalance(address) {
    const res = await fetch(`${API_BASE}/balance/${address}`);
    if (!res.ok) {
      throw new Error("Failed to fetch balance");
    }
    return res.json();
}

export async function mineToAddr(address) {
    const res = await fetch(`${API_BASE}/mine/${address}`, {
        method: 'POST'
    });

    if (!res.ok) {
        throw new Error("Failed to mine block");
    }

    return res.json();
}


export async function reset() {
    const res = await fetch(`${API_BASE}/reset`, {
        method: 'POST'
    });

    if (!res.ok) {
        throw new Error("Error resetting");
    }

    return res.json();
}
