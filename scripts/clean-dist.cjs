const fs = require('fs');
const paths = ['dist/client', 'dist/server'];
paths.forEach(p => {
  if (fs.existsSync(p)) {
    fs.rmSync(p, { recursive: true, force: true });
    console.log('Removed', p);
  }
});