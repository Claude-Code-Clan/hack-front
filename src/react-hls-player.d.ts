declare module 'react-hls-player' {
  import * as React from 'react';

  export interface ReactHlsPlayerProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
    src: string;
    hlsConfig?: any;
    playerRef?: React.RefObject<HTMLVideoElement | null>;
    getHLSRef?: (hlsInstance: any) => void;
  }

  const ReactHlsPlayer: React.ComponentType<ReactHlsPlayerProps>;
  export default ReactHlsPlayer;
}