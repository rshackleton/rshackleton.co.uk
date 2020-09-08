const BannerImage: React.FC<{ image: string }> = ({ image, ...rest }) => {
  if (!image || typeof image !== 'string') {
    return null;
  }

  const variants: [number, number][] = [
    // width : aspect ratio
    [400, 1],
    [800, 1],
    [1200, 1],
    [1600, 1],
    [2000, 1],
  ];

  const dv = variants[Math.floor(variants.length / 2)];

  return (
    <picture>
      <source sizes="100vw" srcSet={variants.map((v) => `${getUrl(v)} ${v[0]}w`).join(', ')} />
      <img className="banner-image" sizes="100vw" src={getUrl(dv)} alt="" {...rest} />
    </picture>
  );

  function getUrl([width, ratio]: [number, number]): string {
    return `${image}?w=${width}&h=${width * ratio}&fit=crop&auto=format`;
  }
};

export default BannerImage;
