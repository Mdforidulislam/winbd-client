// class WebSocketService {
//     static instance = null;
//     callbacks = {};

//     static getInstance() {
//         if (!WebSocketService.instance) {
//             WebSocketService.instance = new WebSocketService();
//         }
//         return WebSocketService.instance;
//     }

//     constructor() {
//         this.socketRef = null;
//     }

//     connect = () => {
//         const path = 'ws://windb-server-live.onrender.com/'; // Ensure this matches the server URL
//         this.socketRef = new WebSocket(path);

//         this.socketRef.onopen = () => {
//             console.log('WebSocket connection opened');
//         };

//         this.socketRef.onmessage = (e) => {
//             this.socketNewMessage(e.data);
//         };

//         this.socketRef.onclose = () => {
//             console.log('WebSocket connection closed');
//             setTimeout(() => this.connect(), 1000); // Reconnect after 1 second
//         };

//         this.socketRef.onerror = (e) => {
//             console.error('WebSocket error:', e.message);
//         };
//     };

//     socketNewMessage = (data) => {
//         const parsedData = JSON.parse(data);
//         const callback = this.callbacks[parsedData.type];
//         if (callback) {
//             callback(parsedData);
//         }
//     };

//     addCallbacks = (type, callback) => {
//         this.callbacks[type] = callback;
//     };

//     sendMessage = (data) => {
//         try {
//             if (this.socketRef.readyState === WebSocket.OPEN) {
//                 this.socketRef.send(JSON.stringify(data));
//             } else {
//                 console.warn('WebSocket not open. Message not sent.');
//             }
//         } catch (err) {
//             console.error('WebSocket send error:', err.message);
//         }
//     };

//     state = () => {
//         return this.socketRef.readyState;
//     };

//     waitForSocketConnection = (callback) => {
//         const socket = this.socketRef;
//         const recursion = this.waitForSocketConnection;
//         setTimeout(function () {
//             if (socket.readyState === WebSocket.OPEN) {
//                 console.log('Connection is made');
//                 if (callback) {
//                     callback();
//                 }
//             } else {
//                 console.log('Waiting for WebSocket connection...');
//                 recursion(callback);
//             }
//         }, 1000); // Retry every second
//     };
// }

// const WebSocketInstance = WebSocketService.getInstance();

// export default WebSocketInstance;
