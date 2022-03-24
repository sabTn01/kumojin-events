using System.Threading.Tasks;
using Kumojin.Backend.Infrastructure.KumojinEvents;
using Kumojin.Backend.Tests.Helpers;
using Xunit;

namespace Kumojin.Backend.Tests.Infrastructure.KumojinEvents
{
    public class KumojinEventRepositoryTests
    {
        private KumojinEventRepository _kumojinEventRepository;

        public KumojinEventRepositoryTests()
        {
            _kumojinEventRepository = new KumojinEventRepository();

            _kumojinEventRepository.kumojinEvents = KumojinEventStubs.Get_List_Stub();
        }

        [Fact]
        public async Task InsertAsync_Should_Insert_New_Event()
        {
            // Arrange
            var newEvent = KumojinEventStubs.Get_List_Stub()[0];

            // Act
            await _kumojinEventRepository.InsertAsync(newEvent);

            // Assert
            Assert.Equal(2, _kumojinEventRepository.kumojinEvents.Count);
        }

        [Fact]
        public async Task ListAsync_Should_Return_The_Events_List()
        {
            // Arrange
            // Act
            var result = await _kumojinEventRepository.GetListAsync();

            // Assert
            Assert.Equal(result.Count, _kumojinEventRepository.kumojinEvents.Count);
        }
    }
}