const SessionStats = {
  completed: 0,
  upcoming: 0,
  totalHours: 0,
};

const Session = {
  id: '',
  consultantName: '',
  consultantRole: '',
  consultantImage: '',
  sessionType: '',
  dateTime: '',
  duration: 0,
  price: 0,
  status: 'scheduled',
};

const Package = {
  id: '',
  name: '',
  sessionsRemaining: 0,
  totalSessions: 0,
};

const JourneyCardProps = {
  icon: null,
  title: '',
  description: '',
  linkText: '',
  onLinkClick: () => {},
};

const ScheduleSectionProps = {
  sessions: [],
};

const SessionCardProps = {
  session: Session,
};

const WelcomeBannerProps = {
  userName: '',
  stats: SessionStats,
};

export {
  SessionStats,
  Session,
  Package,
  JourneyCardProps,
  ScheduleSectionProps,
  SessionCardProps,
  WelcomeBannerProps,
};
