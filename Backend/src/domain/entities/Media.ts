export interface Media {
    id: string;
    mediaType: string;  // image, video, audio, document
    url: string;
    caption?: string;
    mimeType?: string;
    fileSize?: number;
    width?: number;
    height?: number;
    duration?: number;
    createdAt?: Date;
    updatedAt?: Date;
}