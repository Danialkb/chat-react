export const useWS = () => {
    const wsUrl = 'ws://localhost:8000/ws/notifications/?token=' + localStorage.getItem("token");
    const socket = new WebSocket(wsUrl);

    socket.onopen = function() {
        console.log('Соединение установлено');
    };

    socket.onclose = function(event) {
        console.log('Соединение закрыто');
    };

    return socket;
}