dir *.ts /b /s > ts-files.txt
tsc --out engarde.js @ts-files.txt