type TFunction = () => any;

export default function useDebounce(fn: TFunction, timeout: number = 300) {
    let timer: ReturnType<typeof setTimeout>;
    return (...args: any) => {
        clearTimeout(timer);
        timer = setTimeout(() => { fn.apply(null, args) }, timeout);
    };
}