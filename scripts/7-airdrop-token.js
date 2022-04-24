import sdk from './1-initialize-sdk.js';

const editionDrop = sdk.getEditionDrop(
	'0xD356f33dCB76e0b2C43aAEdbCc59090234109edC'
);
const token = sdk.getToken('0x3580929ba65CC8C20A2BaF9F339476aB0Df3B48C');

(async () => {
	try {
		const walletAddresses = await editionDrop.history.getAllClaimerAddresses(0);
		if (walletAddresses.length === 0) {
			console.log(
				'No NFTs have been claimed yet, maybe get some firends to claim your free NFTs'
			);
			process.exit(0);
		}

		const airdropTargets = walletAddresses.map((address) => {
			const randomAmount = Math.floor(
				Math.random() * (10000 - 1000 + 1) + 1000
			);
			console.log('✅ Going to airdrop', randomAmount, 'tokens to', address);

			const airdropTarget = {
				toAddress: address,
				amount: randomAmount,
			};
			return airdropTarget;
		});

		console.log('🌈 Starting airdrop...');
		await token.transferBatch(airdropTargets);
		console.log(
			'✅ Successfully airdropped tokens to all the holders of the NFT!'
		);
	} catch (error) {
		console.log('faied to airdrop tokens', error);
	}
})();
