import { React } from "react";
import { Card } from "react-bootstrap";

function Avatar() {
    console.log("ola");
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

    const listItems = numbers.map((key) => (
        <Card
            key={key}
            id={key + "_Card"}
            /* className="button-fix" */
            /* onClick={() => enterGame(value)} */
        >
            <div>
                {/* <img
                        src={value["img"]}
                        alt="Info"
                        className="card-img"
                        id={key}
                    /> */}
                <h2 >{key}</h2>
            </div>
        </Card>
    ));

    return listItems;
}

export default Avatar;
