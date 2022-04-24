import { useAddress, useMetamask, useEditionDrop } from '@thirdweb-dev/react';
import { useState, useEffect } from 'react';

const log = (arg) => console.log(arg);

const App = () => {
	const address = useAddress();
	const connectWithMetamask = useMetamask();
	log(`👋 Address:${address}`);

	const editionDrop = useEditionDrop(
		'0xD356f33dCB76e0b2C43aAEdbCc59090234109edC'
	);
	const [hasClaimedNFT, setHasClaimedNFT] = useState(false);
	const [isClaiming, setIsClaiming] = useState(false);

	useEffect(() => {
		if (!address) {
			return;
		}

		const checkBalance = async () => {
			try {
				const balance = await editionDrop.balanceOf(address, 0);
				if (balance.gt(0)) {
					setHasClaimedNFT(true);
					console.log('🌟 this user has a membership NFT!');
				} else {
					setHasClaimedNFT(false);
					console.log("😭 this user doesn't have a membership NFT.");
				}
			} catch (error) {
				setHasClaimedNFT(false);
				console.error('Failed to get balance', error);
			}
		};
		checkBalance();
	}, [address, editionDrop]);

	const mintNFT = async () => {
		try {
			setIsClaiming(true);
			await editionDrop.claim('0', 1);
			console.log(
				`🌊 Successfully Minted! Check it out on OpenSea: https://testnets.opensea.io/assets/${editionDrop.getAddress()}/0`
			);
			setHasClaimedNFT(true);
		} catch (error) {
			console.error('Failed to mint NFT', error);
		} finally {
			setIsClaiming(false);
		}
	};

	if (!address) {
		return (
			<div className="landing">
				<h1>Welcome to Maple DAO</h1>
				<button onClick={connectWithMetamask} className="btn-hero">
					Connect your wallet
				</button>
			</div>
		);
	} else {
		if (hasClaimedNFT) {
			return (
				<div className="member-page">
					<h1>🍪DAO Member Page</h1>
					<p>Congratulations on being a member</p>
				</div>
			);
		} else {
			return (
				<div className="landing">
					<h1>Mint your free 🍁 DAO Membership NFT</h1>
					<button disabled={isClaiming} onClick={mintNFT}>
						{isClaiming ? 'Minting...' : 'Mint your NFT (FREE)'}
					</button>
				</div>
			);
		}
	}
};

export default App;
