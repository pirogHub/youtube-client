interface IImageLoader {
    src: string
    width: number
    quality: number
}

const imageLoader = ({ src, width, quality }: IImageLoader) => {
    return `${process.env.APP_SERVER_DOMAIN}${src}?w=${width}&q=${quality || 75}`;
};
