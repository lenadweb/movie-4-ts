export const formatNumberThousand = (number: number): string => {
    try {
        return !Number.isNaN(number) ? number.toLocaleString('ru-RU', {
            minimumFractionDigits: 0,
        }).replaceAll(',', '.') : '0';
    } catch (e) {
        return '0';
    }
};

export const formatDate = (date: any): string => new Date(date).toLocaleDateString('RU-ru');
