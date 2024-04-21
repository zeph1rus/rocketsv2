---
title: Counting ImmutableMultiDicts
language: "python"
tags: ['python']
date: 2019-03-11
description: How to count an immutable multidict (as used in Werkzeug/Flask)
---
```python
def count_werkzeug_multi_dict(multi_dict: ImmutableMultiDict) -> int:
    """
    Counts all of the possible key/value pairs in a multidict, as they have no __len__ implementation, for example
    Flask's request.files attribute (in case you want to know how many files got attached to a request 
       
    :param multi_dict:  A MultiDict object from werkzeug, such as ImmutableMultiDict, should work for it's mutable
        version too.
    :type multi_dict: ImmutableMultiDict
    :return: Returns the count of possible kv pairs (including duplicate keys) as an int
    :rtype: int
    """
    i: int = 0
    for multi_dict_key in multi_dict.keys():
        i += len(multi_dict.getlist(multi_dict_key))
    return i

```
