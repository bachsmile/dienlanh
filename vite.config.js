import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy'; // Sửa lại cách import

export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        { src: 'sanpham', dest: '' },
        { src: 'f8-zpc.zdn.vn', dest: '' },
        { src: 'file', dest: '' },
        { src: 'gcs.tripi.vn', dest: '' },
        { src: 'icdn.dantri.com.vn', dest: '' },
        { src: 'hts-cache', dest: '' },
        { src: 'maylanh', dest: '' },
        { src: 'salt.tikicdn.com', dest: '' },
        { src: 'themes', dest: '' },
      ],
    }),
  ],
});
