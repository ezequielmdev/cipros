const { execSync } = require('child_process');
const fs = require('fs');

console.log('--- Construindo pacotes de produção CIPROS (Minificação & Anti-Plágio) ---');

try {
  // 1. Compilar CSS
  console.log('1. Compilando CSS: src/css/style.css + src/css/security-lgpd.css -> css/app.min.css');
  execSync('npx clean-css-cli -o css/app.min.css src/css/style.css src/css/security-lgpd.css', { stdio: 'inherit' });

  // 2. Compilar JS
  console.log('2. Compilando JS: security.js + data.js + atlas3d.js + main.js + lgpd.js -> js/app.min.js');
  execSync('npx terser src/js/security.js src/js/data.js src/js/atlas3d.js src/js/main.js src/js/lgpd.js --compress --mangle -o js/app.min.js', { stdio: 'inherit' });

  console.log('✓ Sucesso! Pacotes gerados com proteção de código ativa.');
} catch (error) {
  console.error('Erro durante o build:', error);
  process.exit(1);
}
