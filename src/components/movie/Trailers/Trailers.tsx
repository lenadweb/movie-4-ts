// import React from 'react';
// import ReactHlsPlayer from 'react-hls-player';
//
// const Trailers = ({ trailers }) => {
//     const playerRef = React.useRef();
//
//     function playVideo() {
//         playerRef.current.play();
//     }
//
//     function pauseVideo() {
//         playerRef.current.pause();
//     }
//
//     function toggleControls() {
//         playerRef.current.controls = !playerRef.current.controls;
//     }
//     const trailersToShow = trailers?.length && trailers?.filter((item) => item.site = 'KINOPOISK_WIDGET');
//
//     return (
//         <div>
//             <ReactHlsPlayer
//                 src="https://strm.yandex.ru/vh-kp-converted/ott-content/389282676-43546d58d74bdba2b95f9176cd737cd5/ysign1=f3933c9edd9bc7bd21fb547dfca1c564f5e010e39f2c639b998634c923a97842,abcID=1358,from=ott-kp,pfx,sfx,ts=61cc3a31/master.m3u8"
//                 playerRef={playerRef}
//             />
//         </div>
//     );
// };
//
// export default Trailers;
