mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://shubham:shubham@jsblog-2an6h.mongodb.net/test?retryWrites=true');
var conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', function() {
  console.log('Connected');
});

process.on('SIGINT', function() {
  mongoose.connection.close(function () { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0);
  }); 
});