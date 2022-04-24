import { useAddress, useMetamask } from '@thirdweb-dev/react';

const log = (arg) => console.log(arg);

const App = () => {
	const address = useAddress();
	const connectWithMetamask = useMetamask();
	log(`👋 Address:${address}`);

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
		return (
			<div className="landing">
				<h1>👀 wallet connected, now what!</h1>
			</div>
		);
	}
};

export default App;
