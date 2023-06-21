import styled from 'styled-components';

export type SkeletonProps = {
  width: number | string;
  height: number | string;
};

export function Skeleton({ width, height }: SkeletonProps): React.ReactNode {
  return <S.StyledSkeleton width={width} height={height} />;
}

export default function SkeletonContainer() {
  return (
    <S.SkeletonContainer>
      <div>
        <Skeleton width="630px" height="30px" />
        <Skeleton width="630px" height="30px" />
      </div>
      <Skeleton width="600px" height="80px" />
      <Skeleton width="600px" height="80px" />
      <Skeleton width="600px" height="80px" />
    </S.SkeletonContainer>
  );
}

const S = {
  SkeletonContainer: styled.div`
  height: 100%;
  padding: 24px 24px 0 24px;
  width: 100%;
  display: flex;
  gap: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > div {
    display: flex;
    flex-direction: column;
    margin: 20px 0;
  }
`,
  StyledSkeleton: styled.div<SkeletonProps>`
    position: relative;
    overflow: hidden;
    height: ${({ height }) => height};
    width: ${({ width }) => width};
    background-color: #f3f3f3;
    border-radius: 5px;

    @keyframes skeleton {
      0% {
        background-color: rgba(164, 164, 164, 0.1);
      }
      50% {
        background-color: rgba(164, 164, 164, 0.3);
      }
      100% {
        background-color: rgba(164, 164, 164, 0.1);
      }
    }

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      animation: skeleton 1.6s infinite ease-in-out;
    }
  `,


};
