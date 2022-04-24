import sdk from './1-initialize-sdk.js';
import { ethers } from 'ethers';

const vote = sdk.getVote('0x4e96F4343E0D010F90918AD02662E43Ca53E49A7');
const token = sdk.getToken('0x3580929ba65CC8C20A2BaF9F339476aB0Df3B48C');

(async () => {
	try {
		const amount = 420_000;
		const description =
			'Should the DAO mint an additional ' +
			amount +
			' tokens into the treasury?';
		const execusions = [
			{
				toAddress: token.getAddress(),
				nativeTokenValue: 0,
				transactionData: token.encoder.encode('mintTo', [
					vote.getAddress(),
					ethers.utils.parseUnits(amount.toString(), 18),
				]),
			},
		];

		await vote.propose(description, execusions);

		console.log('✅ Successfully created proposal to mint tokens');
	} catch (error) {
		console.error('failed tp create first proposal', error);
		process.exit(1);
	}

	try {
		const amount = 6_900;
		const description =
			'Should the DAO transfer ' +
			amount +
			' tokens from the treasury to ' +
			process.env.WALLET_ADDRESS +
			' for being awesome?';
		const execusions = [
			{
				toAddress: token.getAddress(),
				nativeTokenValue: 0,
				transactionData: token.encoder.encode('transfer', [
					process.env.WALLET_ADDRESS,
					ethers.utils.parseUnits(amount.toString(), 18),
				]),
			},
		];

		await vote.propose(description, execusions);

		console.log(
			"✅ Successfully created proposal to reward ourselves from the treasury, let's hope people vote for it!"
		);
	} catch (error) {
		console.error('failed to create second proposal', error);
	}
})();
