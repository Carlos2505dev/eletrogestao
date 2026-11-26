import { spawn } from 'child_process';
import { rmSync, existsSync } from 'fs';

console.log('Running vite build...');

const child = spawn('npx', ['vite', 'build'], { stdio: 'inherit', shell: true });

child.on('close', async (code) => {
  if (code !== 0) {
    console.error(`vite build exited with code ${code}`);
    process.exit(code);
  }
  
  console.log('Vite build process exited, waiting for any background processes...');
  
  // Wait for any async writes to complete
  await new Promise(resolve => setTimeout(resolve, 5000));
  
  // Keep cleaning until folders stop being recreated
  let attempts = 0;
  const maxAttempts = 10;
  
  while (attempts < maxAttempts) {
    const paths = ['dist/client', 'dist/server', 'dist/server.js'];
    let anyExist = false;
    
    for (const p of paths) {
      if (existsSync(p)) {
        rmSync(p, { recursive: true, force: true });
        console.log('Removed', p);
        anyExist = true;
      }
    }
    
    if (!anyExist) {
      console.log('All folders clean!');
      break;
    }
    
    attempts++;
    console.log(`Attempt ${attempts}/${maxAttempts}: waiting for folders to stop being recreated...`);
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  console.log('Build complete!');
  process.exit(0);
});