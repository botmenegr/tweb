import {For, onMount} from 'solid-js';
import {useSuperTab} from '@components/solidJsTabs/superTabProvider';
import CheckboxFieldTsx from '@components/checkboxFieldTsx';
import Row from '@components/rowTsx';
import Section from '@components/section';
import {AYU_DEFAULTS, AyuSettings} from '@lib/ayu/types';
import {useAppSettings} from '@stores/appSettings';

type AyuRow = {
  key: keyof AyuSettings,
  title: string,
  subtitle: string
};

const GHOST: AyuRow[] = [
  {
    key: 'ghostRead',
    title: 'Не отмечать прочитанным',
    subtitle: 'Собеседник не увидит, что вы прочитали сообщение или прослушали голосовое'
  },
  {
    key: 'ghostTyping',
    title: 'Не показывать «печатает…»',
    subtitle: 'Ни набор текста, ни запись голосового, ни отправка файла не видны другим'
  },
  {
    key: 'ghostOnline',
    title: 'Не показывать «в сети»',
    subtitle: 'Ваш статус всегда «был(а) недавно»'
  },
  {
    key: 'ghostStories',
    title: 'Скрытый просмотр сторис',
    subtitle: 'Просмотр сторис не отмечается у автора'
  },
  {
    key: 'hideSponsored',
    title: 'Скрыть рекламу',
    subtitle: 'Спонсорские сообщения в каналах не показываются'
  }
];

const SAVING: AyuRow[] = [
  {
    key: 'saveDeleted',
    title: 'Сохранять удалённые сообщения',
    subtitle: 'Сообщение, удалённое собеседником, остаётся в чате с пометкой «удалено»'
  },
  {
    key: 'saveEdits',
    title: 'Сохранять историю правок',
    subtitle: 'Прежние тексты изменённого сообщения видны во всплывающей подсказке над временем'
  }
];

const PROTECTED: AyuRow[] = [
  {
    key: 'allowCopy',
    title: 'Копировать из защищённых чатов',
    subtitle: 'Текст выделяется и копируется, медиа сохраняется. Пересылка сервером по-прежнему запрещена. Полностью — после перезагрузки страницы'
  }
];

/** The AyuGram-style switches. They apply at once and are kept with the other app settings. */
export default function AyuSettingsSections() {
  const [tab] = useSuperTab();
  const [appSettings, setAppSettings] = useAppSettings();
  onMount(() => tab.title.replaceChildren('AyuGram'));
  const isOn = (key: keyof AyuSettings) => appSettings.ayu?.[key] ?? AYU_DEFAULTS[key];
  const toggle = (key: keyof AyuSettings, value: boolean) => setAppSettings('ayu', {...appSettings.ayu, [key]: value});

  const renderRow = (item: AyuRow) => (
    <Row>
      <Row.CheckboxFieldToggle>
        <CheckboxFieldTsx toggle checked={isOn(item.key)} onChange={(checked) => toggle(item.key, checked)} />
      </Row.CheckboxFieldToggle>
      <Row.Title>{item.title}</Row.Title>
      <Row.Subtitle>{item.subtitle}</Row.Subtitle>
    </Row>
  );

  return (
    <>
      <Section name={<span>Режим призрака</span>}>
        <For each={GHOST}>{renderRow}</For>
      </Section>
      <Section name={<span>Сохранение</span>}>
        <For each={SAVING}>{renderRow}</For>
      </Section>
      <Section name={<span>Защищённый контент</span>}>
        <For each={PROTECTED}>{renderRow}</For>
      </Section>
      <Section name={<span>Профиль</span>}>
        <Row>
          <Row.CheckboxFieldToggle>
            <CheckboxFieldTsx toggle checked={appSettings.showPeerIds} onChange={(checked) => setAppSettings('showPeerIds', checked)} />
          </Row.CheckboxFieldToggle>
          <Row.Title>Показывать ID</Row.Title>
          <Row.Subtitle>В профиле пользователя, чата или канала, нажатие копирует ID</Row.Subtitle>
        </Row>
      </Section>
    </>
  );
}
