import { it, expect, beforeEach } from 'vitest'
import { makeResetOtherKeys, makeSetter } from '../formWatcher';

const outerIds = [22, 332];
const innerIds = [1, 2, 3];
let initFields: Record<string, string | number> | undefined; 
let punchingBag: Record<string, string | number | null> | null;
let formWatcher: any;

beforeEach(() => {
    punchingBag = null;
    formWatcher = null;
    initFields = 
        outerIds.reduce((fields, od) => ({
        ...fields,
        ...innerIds.reduce((keys, id) => ({
            ...keys,
            [`${od}-${id}`]: null
        }), {})
    }), {});
});

it('shouldnt reset if no target is given', () => {
    const outerId = '22';
    const targetId = '2';
    const targetKey = outerId + '-' + targetId;

    formWatcher = new Proxy(initFields as Object, {
        set: makeSetter(
            makeResetOtherKeys()
        )
    });
    formWatcher[outerId + '-3'] = 'No';
    formWatcher[outerId + '-1'] = 'Yes';
    formWatcher[targetKey] = 'Yes';  

    expect(formWatcher).toStrictEqual({
        "22-1": 'Yes',
        "22-2": 'Yes',
        "22-3": 'No',
        "332-1": null,
        "332-2": null,
        "332-3": null
    });
});

it('resetOtherKeys in XX-XX format', () => {
    const outerId = '22';
    const targetId = '2';
    const targetKey = outerId + '-' + targetId;
    const punchingBag = {
        ...initFields
    };
    formWatcher = new Proxy(initFields, {
        set: makeSetter(
            makeResetOtherKeys(targetId)
        )
    });
    formWatcher[outerId + '-3'] = 'No';
    formWatcher[outerId + '-1'] = 'Yes';
    formWatcher[targetKey] = 'Yes';  
    punchingBag[targetKey] = formWatcher[targetKey];

    expect(formWatcher).toStrictEqual(punchingBag);
});

it('resetOtherKeys in XXXX format', () => {
    const targetKey = 'email';
    const target = {
        email: null,
        phone: null,
        password: null,
        name: null,
    };
    punchingBag = {
        ...target
    }
    formWatcher = new Proxy(target, {
        set: makeSetter(
            makeResetOtherKeys(targetKey)
        )
    });
    formWatcher.phone = '(248)2389344';
    formWatcher.name = 'Cas';
    formWatcher[targetKey] = 'Yes';  
    punchingBag[targetKey] = formWatcher[targetKey];

    expect(formWatcher).toStrictEqual(punchingBag);
});
