```jsx
import React, { useEffect } from 'react';
const ComponentExample => () => {
    useEffect(() => {
        // Anything in here is fired on component mount.
        return () => {
            // Anything in here is fired on component unmount.
        }
    }, [])
}
```
