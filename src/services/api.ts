const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export interface ReflectionSetupParams {
    tokenMint: string;
    tokenName: string;
    tokenSymbol: string;
    decimals: number;
    owner: string;
}

export async function setupTokenReflection(params: ReflectionSetupParams) {
    try {
        console.log('[Reflection Setup] Sending request to backend...');
        console.log('Request URL:', `${API_BASE_URL}/api/setup-reflection`);
        console.log('Payload:', params);

        const response = await fetch(`${API_BASE_URL}/api/setup-reflection`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        });

        console.log('[Reflection Setup] Response status:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('[Reflection Setup] Backend error:', errorText);
            throw new Error(errorText);
        }

        const result = await response.json();
        console.log('[Reflection Setup] Success:', result);

        return result;
    } catch (error) {
        console.error('[Reflection Setup] Request failed:', error);
        throw error;
    }
}
