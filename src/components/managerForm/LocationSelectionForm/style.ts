import styled from '@emotion/styled';

export const LocationSelectionForm = styled.div`
  > p {
    margin-top: 4px;
    margin-bottom: 14px;
  }
`;

export const SelectButton = styled.button<{ region: string; isOptionsOpen: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 55px;
  padding: 0 10px;
  margin-top: 18px;
  border: 1px solid ${({ theme }) => theme.colors.yolda_black_1};
  border-radius: 5px;
  ${({ theme }) => theme.font.bold_16}
  background-color: transparent;
  outline: none;
  cursor: pointer;

  .select-region {
    position: relative;
    display: ${({ isOptionsOpen, region }) => {
      if (!isOptionsOpen) return 'flex';
      else if (!isOptionsOpen && !region) return 'flex';
      else if (isOptionsOpen && region) return 'none';
    }};
    align-items: center;
  }

  .select-detail {
    display: ${({ isOptionsOpen, region }) => (isOptionsOpen && region ? 'grid' : 'none')};
    grid-template-columns: 1fr 1fr;
    width: 100%;
    padding-left: 6px;
    text-align: left;

    span:first-of-type {
      color: ${({ theme }) => theme.colors.yolda_gray_4};
    }
  }

  svg {
    position: relative;
    top: 1px;
    margin-left: 8px;
  }
`;

export const ListWrapper = styled.div`
  position: absolute;
  top: 55px;
  left: 0;
  display: flex;
  width: 100%;
  padding-top: 7px;
  border: 1px solid ${({ theme }) => theme.colors.yolda_black_1};
  border-top: none;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  background-color: #ffffff;

  ul {
    flex-grow: 1;
    flex-basis: 0;
    height: 260px;
    overflow-y: auto;
  }

  input[type='radio'],
  input[type='checkbox'] {
    display: none;
  }

  input[type='radio'] + label,
  input[type='checkbox'] + label {
    display: flex;
    align-items: center;
    width: 100%;
    height: 44px;
    padding: 0 12px;
    color: ${({ theme }) => theme.colors.yolda_black_1};
    font-size: 16px;
  }

  input[type='radio']:checked + label,
  input[type='checkbox']:checked + label {
    font-weight: 700;
    border: 2px solid ${({ theme }) => theme.colors.sub_blue_2};
    border-radius: 5px;
  }
`;

export const SelectedLocation = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 8px;
  width: 230px;

  div {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 110px;
    height: 32px;
    padding-left: 12px;
    border-radius: 5px;
    color: #ffffff;
    font-size: 13px;
    background-color: ${({ theme }) => theme.colors.main_blue};

    button {
      position: absolute;
      right: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 18px;
      height: 18px;
      border: none;
      background-color: transparent;
      outline: none;
    }

    img {
      display: block;
      color: #ffffff;
    }
  }
`;
