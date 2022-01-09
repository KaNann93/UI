import React, {
    useState,
    useEffect,
    useCallback,
    useRef,
} from 'react';
import moment from 'moment';
import {validateToken} from 'utility/token'
import { useHistory } from 'react-router';

const Session = (props) => {

    const [events, setEvents] = useState(['click', 'load', 'scroll']);
    const [second, setSecond] = useState(0);
    let sessionToken=sessionStorage.getItem('token')||'_';
    let timeStamp;
    let warningInactiveInterval = useRef();
    let startTimerInterval = useRef();

    let hist=useHistory();

    let isAuthenticated = async () => {
        const token = sessionStorage.getItem('token');
        if(sessionToken==token) return true;
        if(await validateToken(token)){
            sessionToken=token;
            return true;
        }
        return false;
    }
    // start inactive check
    let timeChecker = () => {
        startTimerInterval.current = setTimeout(() => {
            let storedTimeStamp = sessionStorage.getItem('lastTimeStamp');
            warningInactive(storedTimeStamp);
        }, 600000);
    };

    // warning timer
    let warningInactive = (timeString) => {
        clearTimeout(startTimerInterval.current);

        warningInactiveInterval.current = setInterval(() => {
            const maxTime = 20; // Maximum ideal time given before logout 
            const popTime = 19; // remaining time (notification) left to logout.

            const diff = moment.duration(moment().diff(moment(timeString)));
            const minPast = diff.minutes();
            const leftSecond = 60 - diff.seconds();

            if (minPast === popTime) {
                setSecond(leftSecond);
            }

            if (minPast === maxTime) {
                clearInterval(warningInactiveInterval.current);
                sessionStorage.removeItem('lastTimeStamp');
                sessionStorage.removeItem('token');
                // your logout function here
                sessionToken='_';
                //window.location.href="/login";
                hist.push("/login");
            }
        }, 10);
    };

    // reset interval timer
    let resetTimer = useCallback(() => {

        if (isAuthenticated) {
            timeStamp = moment();
            sessionStorage.setItem('lastTimeStamp', timeStamp);
        } else {
            sessionStorage.removeItem('lastTimeStamp');
            sessionStorage.removeItem('token');
        }
    }, [isAuthenticated]);

    // Life cycle hook
    useEffect(() => {
        events.forEach((event) => {
            window.addEventListener(event, resetTimer);
        });
        // Run the timeChecker
        timeChecker();
        return () => {
            clearTimeout(startTimerInterval.current);
        };
    }, [resetTimer, events, timeChecker]);

    if(!isAuthenticated()) hist.push("/login");
    if(second>0){
        return<div>
            <h1>
                {second}
            </h1>
        </div>
    }
    else return <div>
        
        {props.children}
    </div>;
};

export default Session;