const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const commonDomains = [
    "gmail.com",
    "yahoo.com",
    "hotmail.com",
    "outlook.com",
    "live.com",
    "aol.com",
    "icloud.com",
];
const suggestEmails = (input) => {
    if (!input || !input.includes('@')) {
        return [];
    }

    const [localPart, domainPart] = input.split('@');

    if (emailRegex.test(input)) {
        return [];
    }

    const suggestions = commonDomains
        .filter(domain => domain.startsWith(domainPart) && domain !== domainPart)
        .map(domain => `${localPart}@${domain}`);

    return suggestions;
};

export { suggestEmails };
