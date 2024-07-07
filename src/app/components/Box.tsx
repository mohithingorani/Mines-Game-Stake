// src/components/Box.jsx
import Image from "next/image";



interface StateProps {
    state: "hideGrey" | "showGreen" | "showRed";
}

export function Box({ onClick, state, show }: {onClick : React.MouseEventHandler<HTMLImageElement>, state : string, show:boolean}) {
    if(!show){
        return (
            <div className="flex justify-center items-center">
                <Image src="/element1.svg" alt="box" width={120} height={120} onClick={onClick} className="select-none" />
            </div>
        );
    }

    if (state === "hideGrey") {
        return (
            <div className="flex justify-center items-center">
                <Image src="/element1.svg" alt="box" width={120} height={120} onClick={onClick} className="select-none" />
            </div>
        );
    }
    if (state === "showGreen") {
        return (
            <div className="flex justify-center items-center">
                <Image src="/element2.svg" alt="box" width={120} height={120} onClick={onClick} className=" select-none"/>
            </div>
        );
    }
    if (state === "showRed") {
        return (
            <div className="flex justify-center items-center">
                <Image src="/element3.svg" alt="box" width={120} height={120} onClick={onClick} />
            </div>
        );
    }

    return null;
}
