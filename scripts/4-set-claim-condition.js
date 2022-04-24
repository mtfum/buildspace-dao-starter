import sdk from './1-initialize-sdk.js';
import { MaxUint256 } from '@ethersproject/constants';

const editionDrop = sdk.getEditionDrop(
	'0xD356f33dCB76e0b2C43aAEdbCc59090234109edC'
);

(async () => {
	try {
		const claimconditions = [
			{
				startTime: new Date(),
				maxQuantity: 50_000,
				price: 0,
				quantityLimitPerTransaction: 1,
				waitInSeconds: MaxUint256,
			},
		];

		await editionDrop.claimConditions.set('0', claimconditions);
		console.log('✅ Successfully set claim condition!');
	} catch (error) {
		console.error('failed to set claim condition', error);
	}
})();
