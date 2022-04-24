import { readFileSync } from 'fs';
import sdk from './1-initialize-sdk.js';

const editionDrop = sdk.getEditionDrop(
	'0xD356f33dCB76e0b2C43aAEdbCc59090234109edC'
);

(async () => {
	try {
		await editionDrop.createBatch([
			{
				name: 'Maple Leaf Badge',
				description: 'This NFT will give you access to MapleDAO!',
				image: readFileSync('scripts/assets/leaf.jpeg'),
			},
		]);
		console.log('✅ Successfully created a new NFT in the drop!');
	} catch (err) {
		console.error('failed to create the new NFT', err);
	}
})();
