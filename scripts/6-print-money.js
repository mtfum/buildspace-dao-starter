import sdk from './1-initialize-sdk.js';

const token = sdk.getToken('0x3580929ba65CC8C20A2BaF9F339476aB0Df3B48C');

(async () => {
	try {
		const amount = 1_000_000_000;
		await token.mint(amount);
		const totalSupply = await token.totalSupply();

		console.log(
			'✅ There now is',
			totalSupply.displayValue,
			'$MAPLE in circulation'
		);
	} catch (error) {
		console.log('Failed to print money', error);
	}
})();
