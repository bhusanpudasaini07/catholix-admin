import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const getI18nProps = async ({ locale }: { locale: string }) => ({
  props: {
    locale,
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
