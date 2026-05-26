declare module 'meshline' {
  export const MeshLineGeometry: any;
  export const MeshLineMaterial: any;
}

declare global {
  interface ImportMetaEnv {
    readonly BASE_URL: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }

  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: any;
      meshLineMaterial: any;
    }
  }
}

export {};
