import { useEffect } from "react";

const Sample = () => {
    useEffect(() => {
        console.log("Sample component mounted");
        return () => {
            console.log("Sample component unmounted");
        }
    },[]);
    return (
        <div>これはサンプルです。</div>
    );
}

export default Sample;