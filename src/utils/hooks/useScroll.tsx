import { useState, useEffect } from 'react';

const useScroll = () => {
    const [scroll, setScroll] = useState({
        height: 0,
        isReachBottom: false,
    });

    useEffect(() => {
        const handleScroll = () => {
            const { body, documentElement: html } = document;
            const windowHeight = 'innerHeight' in window ? window.innerHeight : html.offsetHeight;
            const docHeight = Math.max(
                body.scrollHeight,
                body.offsetHeight,
                html.clientHeight,
                html.scrollHeight,
                html.offsetHeight
            );
            const windowBottom = windowHeight + window.scrollY + 300;

            if (windowBottom >= docHeight) {
                setScroll({
                    height: windowBottom,
                    isReachBottom: true,
                });
            } else {
                setScroll({
                    ...scroll,
                    isReachBottom: false,
                });
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Usage :
    // const scroll = useScroll()
    // useEffect(() => {
    //     const hasMore = page < meta?.pagination?.total_page;
    //     if (scroll.isReachBottom && hasMore) {
    //       setPage(page + 1);
    //     }
    //   }, [scroll.isReachBottom]);

    return scroll;
};

export default useScroll;
