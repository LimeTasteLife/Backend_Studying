const mongoose = require('mongoose');
const url = `mongodb+srv://root:root6365@cluster0.qjuo5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const connect = () => {
    if(process.env.NODE_ENV !== 'production') {
        mongoose.set('debug', true);
    }
    mongoose.connect(url, {
        dbName: 'nodejs',
        useNewUrlParser: true,
        //useCreateIndex: true,
    }, (error) => {
        if (error) {
            console.log('몽고디비 연결 에러', error);
        } else {
            console.log('몽고디비 연결 성공');
        }
    });
};
mongoose.connection.on('error', (error) => {
    console.error('몽고디비 연결 에러', error);
});
mongoose.connection.on('disconnected', () => {
    console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
    connect();
});

module.exports = connect;