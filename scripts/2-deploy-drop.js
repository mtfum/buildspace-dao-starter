import { AddressZero } from '@ethersproject/constants';
import sdk from './1-initialize-sdk.js';
import { readFileSync } from 'fs';

(async () => {
	try {
		const editionDropAddress = await sdk.deployer.deployEditionDrop({
			name: 'Maple DAO Membership',
			description: 'A DAO for people wha likes Web3 and lives in Canada',
			image: readFileSync('scripts/assets/maple.jpg'),
			primary_sale_recipient: AddressZero,
		});

		const editionDrop = sdk.getEditionDrop(editionDropAddress);
		const metadata = await editionDrop.metadata.get();

		console.log(
			'✅ Successfully deployed editionDrop contract, address:',
			editionDropAddress
		);
		console.log('✅ editionDrop metadata:', metadata);
	} catch (err) {
		console.log('failed to deploy editionDrop contract', err);
	}
})();
