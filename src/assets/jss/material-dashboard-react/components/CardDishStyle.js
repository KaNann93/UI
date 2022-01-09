import { grayColor } from 'assets/jss/material-dashboard-react';
const cardDishStyle = {
    cardBody: {
        padding: "0.9375rem 20px",
        flex: "1 1 auto",
        WebkitBoxFlex: "1",
        position: "relative"
    },
    cardBodyPlain: {
        paddingLeft: "5px",
        paddingRight: "5px"
    },
    cardBodyProfile: {
        marginTop: "15px"
    },
    stats: {
        color: grayColor[0],
        display: "inline-flex",
        fontSize: "12px",
        lineHeight: "22px",
        "& svg": {
            top: "4px",
            width: "16px",
            height: "16px",
            position: "relative",
            marginRight: "3px",
            marginLeft: "3px",
        },
        "& .fab,& .fas,& .far,& .fal,& .material-icons": {
            top: "4px",
            fontSize: "16px",
            position: "relative",
            marginRight: "3px",
            marginLeft: "3px",
        },

    }
};
export default cardDishStyle;