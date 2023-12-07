import { shrinkWindow } from './index';

describe('shrinkWindow', () => {
  const createMockWindow = (frame: Rectangle) => {
    const window = jest.mocked({} as Window);
    window.setFrame = jest.fn();
    window.frame = jest.fn().mockReturnValue(frame);
    return window;
  };

  it('shrinks neighour west of window when it is resized to overlap it', () => {
    const mockedWindow = createMockWindow({
      x: 50,
      y: 0,
      width: 100,
      height: 100,
    });
    const mockedNeighbour = createMockWindow({
      x: 0,
      y: 0,
      width: 100,
      height: 100,
    });

    shrinkWindow({
      toShrink: mockedNeighbour,
      relativeTo: mockedWindow,
    });

    expect(mockedWindow.setFrame).not.toHaveBeenCalled();
    expect(mockedNeighbour.setFrame).toHaveBeenCalledWith({
      x: 0,
      y: 0,
      width: 50,
      height: 100,
    });
  });
});
