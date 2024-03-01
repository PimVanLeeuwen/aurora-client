import { ErrorPoster, LocalPoster, MediaPoster, PhotoPoster } from '../../../api/Client';

// Manual definition, because the swagger codegen generates generic objects.
export type Poster = LocalPoster | PhotoPoster | MediaPoster | ErrorPoster;
