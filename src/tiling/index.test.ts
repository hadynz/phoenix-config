import { shrinkWindow } from './index';

describe('shrinkWindow', () => {
  const createMockWindow = (frame: Rectangle) => {
    const window = jest.mocked({} as Window);
    window.setFrame = jest.fn();
    window.frame = jest.fn().mockReturnValue(frame);
    return window;
  };

  it('shrinks neighbour left of window when it is resized to overlap it', () => {
    const mockedWindow = createMockWindow({
      x: 50,
      y: 0,
      width: 200,
      height: 100,
    });
    const mockedNeighbour = createMockWindow({
      x: 10,
      y: 0,
      width: 170,
      height: 100,
    });

    shrinkWindow({
      toShrink: mockedNeighbour,
      relativeTo: mockedWindow,
    });

    expect(mockedWindow.setFrame).not.toHaveBeenCalled();
    expect(mockedNeighbour.setFrame).toHaveBeenCalledWith({
      x: 10,
      y: 0,
      width: 40,
      height: 100,
    });
  });

  it('shrinks neighbour right of window when it is resized to overlap it', () => {
    const mockedWindow = createMockWindow({
      x: 10,
      y: 0,
      width: 200,
      height: 100,
    });
    const mockedNeighbour = createMockWindow({
      x: 50,
      y: 0,
      width: 170,
      height: 100,
    });

    shrinkWindow({
      toShrink: mockedNeighbour,
      relativeTo: mockedWindow,
    });

    expect(mockedWindow.setFrame).not.toHaveBeenCalled();
    expect(mockedNeighbour.setFrame).toHaveBeenCalledWith({
      x: 210,
      y: 0,
      width: 10,
      height: 100,
    });
  });

  it('does nothing if window is on top of overlapping window', () => {
    const mockedWindow = createMockWindow({
      x: 10,
      y: 0,
      width: 200,
      height: 100,
    });
    const mockedNeighbour = createMockWindow({
      x: 30,
      y: 0,
      width: 40,
      height: 100,
    });

    shrinkWindow({
      toShrink: mockedNeighbour,
      relativeTo: mockedWindow,
    });

    expect(mockedWindow.setFrame).not.toHaveBeenCalled();
    expect(mockedNeighbour.setFrame).not.toHaveBeenCalled();
  });
});
