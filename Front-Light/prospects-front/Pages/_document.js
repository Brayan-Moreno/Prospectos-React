import React from "react"
import { Html, Head, Main, NextScript } from "next/document"

const _document = () => {
	return (
		<Html>
			<Head>
				<link
					href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<body>
				<Main />
				{/* <script src="/es6-shim.js"></script>
				<script src="/websdk.client.bundle.min.js"></script> */}
				<NextScript />
			</body>
		</Html>
	);
};

export default _document
