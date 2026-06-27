import React, { Suspense } from 'react';
import * as ReactTestRenderer from 'react-test-renderer';
import { Text } from 'react-native';
import { HomeProvider, useHomeContext } from '../../../src/redux/context/HomeContext';

function TestConsumer() {
  const ctx = useHomeContext();
  return <Text>{`${ctx.selectedTab}|${ctx.destination}|${ctx.checkInOut}|${ctx.guests}|${ctx.rooms}`}</Text>;
}

function createRoot(ui: React.ReactElement): ReactTestRenderer.ReactTestRenderer {
  let root: ReactTestRenderer.ReactTestRenderer;
  ReactTestRenderer.act(() => {
    root = ReactTestRenderer.create(ui);
  });
  return root!;
}

describe('HomeContext', () => {
  it('should provide default context values', () => {
    const root = createRoot(
      <HomeProvider>
        <TestConsumer />
      </HomeProvider>
    );
    expect(root.toJSON()).toEqual(
      expect.objectContaining({ children: ['Search|||2|1'] })
    );
  });

  it('should throw error when useHomeContext is used outside HomeProvider', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => {
      createRoot(<TestConsumer />);
    }).toThrow('useHomeContext must be used within a HomeProvider');
    spy.mockRestore();
  });

  it('should update selectedTab via setSelectedTab', () => {
    let setTabFn: ((tab: string) => void) | undefined;

    function ConsumerWithSetter() {
      const ctx = useHomeContext();
      setTabFn = ctx.setSelectedTab;
      return <Text>{ctx.selectedTab}</Text>;
    }

    const root = createRoot(
      <HomeProvider>
        <ConsumerWithSetter />
      </HomeProvider>
    );

    expect(root.toJSON()).toEqual(
      expect.objectContaining({ children: ['Search'] })
    );
    ReactTestRenderer.act(() => {
      setTabFn!('Bookings');
    });
    expect(root.toJSON()).toEqual(
      expect.objectContaining({ children: ['Bookings'] })
    );
  });

  it('should update destination via setDestination', () => {
    let setDestFn: ((dest: string) => void) | undefined;

    function ConsumerWithSetter() {
      const ctx = useHomeContext();
      setDestFn = ctx.setDestination;
      return <Text>{ctx.destination || 'empty'}</Text>;
    }

    const root = createRoot(
      <HomeProvider>
        <ConsumerWithSetter />
      </HomeProvider>
    );

    expect(root.toJSON()).toEqual(
      expect.objectContaining({ children: ['empty'] })
    );
    ReactTestRenderer.act(() => {
      setDestFn!('Goa, India');
    });
    expect(root.toJSON()).toEqual(
      expect.objectContaining({ children: ['Goa, India'] })
    );
  });

  it('should update checkInOut via setCheckInOut', () => {
    let setDatesFn: ((dates: string) => void) | undefined;

    function ConsumerWithSetter() {
      const ctx = useHomeContext();
      setDatesFn = ctx.setCheckInOut;
      return <Text>{ctx.checkInOut || 'empty'}</Text>;
    }

    const root = createRoot(
      <HomeProvider>
        <ConsumerWithSetter />
      </HomeProvider>
    );

    expect(root.toJSON()).toEqual(
      expect.objectContaining({ children: ['empty'] })
    );
    ReactTestRenderer.act(() => {
      setDatesFn!('May 20 – May 24');
    });
    expect(root.toJSON()).toEqual(
      expect.objectContaining({ children: ['May 20 – May 24'] })
    );
  });

  it('should update guests via setGuests', () => {
    let setGuestsFn: ((guests: number) => void) | undefined;

    function ConsumerWithSetter() {
      const ctx = useHomeContext();
      setGuestsFn = ctx.setGuests;
      return <Text>{String(ctx.guests)}</Text>;
    }

    const root = createRoot(
      <HomeProvider>
        <ConsumerWithSetter />
      </HomeProvider>
    );

    expect(root.toJSON()).toEqual(
      expect.objectContaining({ children: ['2'] })
    );
    ReactTestRenderer.act(() => {
      setGuestsFn!(4);
    });
    expect(root.toJSON()).toEqual(
      expect.objectContaining({ children: ['4'] })
    );
  });

  it('should update rooms via setRooms', () => {
    let setRoomsFn: ((rooms: number) => void) | undefined;

    function ConsumerWithSetter() {
      const ctx = useHomeContext();
      setRoomsFn = ctx.setRooms;
      return <Text>{String(ctx.rooms)}</Text>;
    }

    const root = createRoot(
      <HomeProvider>
        <ConsumerWithSetter />
      </HomeProvider>
    );

    expect(root.toJSON()).toEqual(
      expect.objectContaining({ children: ['1'] })
    );
    ReactTestRenderer.act(() => {
      setRoomsFn!(3);
    });
    expect(root.toJSON()).toEqual(
      expect.objectContaining({ children: ['3'] })
    );
  });

  it('should not re-render when setting same value (optimization check)', () => {
    let renderCount = 0;
    let setTabFn: ((tab: string) => void) | undefined;

    function ConsumerWithCounter() {
      const ctx = useHomeContext();
      setTabFn = ctx.setSelectedTab;
      renderCount++;
      return <Text>{ctx.selectedTab}</Text>;
    }

    createRoot(
      <HomeProvider>
        <ConsumerWithCounter />
      </HomeProvider>
    );

    const initialRenderCount = renderCount;
    ReactTestRenderer.act(() => {
      setTabFn!('Search');
    });
    expect(renderCount).toBe(initialRenderCount);
  });
});
