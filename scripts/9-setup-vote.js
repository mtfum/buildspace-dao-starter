import sdk from './1-initialize-sdk.js';

const vote = sdk.getVote('0x4e96F4343E0D010F90918AD02662E43Ca53E49A7');
const token = sdk.getToken('0x3580929ba65CC8C20A2BaF9F339476aB0Df3B48C');

(async () => {
	try {
		await token.roles.grant('minter', vote.getAddress());
		console.log(
			'Successfully gave vote contract permissions to act on token contract'
		);
	} catch (error) {
		console.error(
			'failed to grant vote contract permissions on token contract',
			error
		);
		process.exit(1);
	}

	try {
		const ownedTokenBalance = await token.balanceOf(process.env.WALLET_ADDRESS);
		const ownedAmount = ownedTokenBalance.displayValue;
		const percent90 = (Number(ownedAmount) / 100) * 90;

		await token.transfer(vote.getAddress(), percent90);

		console.log(
			'✅ Successfully transferred ' + percent90 + ' tokens to vote contract'
		);
	} catch (err) {
		console.error('failed to transfer tokens to vote contract', err);
	}
})();
