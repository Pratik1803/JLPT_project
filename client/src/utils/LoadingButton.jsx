import React, { useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { Children } from "react";

function LoadingButton({ loadingState, innerText, func }) {
	const [loading, setLoading] = useState(loadingState);
    Children.map((ele)=>{console.log(ele);})
	return (
		<Button onClick={func}>
			{loading ? (
				<CircularProgress
					style={{
						color: "red",
                        width:"20px",
                        height:"20px"
					}}
				/>
			) : (
				innerText
			)}
		</Button>
	);
}

export default LoadingButton;
